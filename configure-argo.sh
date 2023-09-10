while getopts p: flag
do
    case "${flag}" in
        p) password=${OPTARG};;
    esac
done

ADMIN_USER="admin"
ADMIN_PASSWD="$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)"

argocd login localhost:8080 --username $ADMIN_USER --password $ADMIN_PASSWD --insecure

argocd repo add https://github.com/sspfinc/eck --username sspfinc --password $password

argocd app create tools \
  --dest-namespace argocd \
  --dest-server https://kubernetes.default.svc \
  --repo https://github.com/sspfinc/eck.git \
  --path helm \
  --sync-policy automated \
  --auto-prune \
  --self-heal

argocd app create applications \
--repo https://github.com/sspfinc/eck.git \
--path apps \
--dest-server https://kubernetes.default.svc \
--dest-namespace default

argocd app sync applications
argocd app sync -l app.kubernetes.io/instance
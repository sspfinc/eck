while getopts p: flag
do
    case "${flag}" in
        p) password=${OPTARG};;
    esac
done

ADMIN_USER="admin"
ADMIN_PASSWD="$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)"

argocd login argocd.peterfarber.com --username $ADMIN_USER --password $ADMIN_PASSWD --grpc-web

argocd repo add https://github.com/sspfinc/eck --username sspfinc --password $password

argocd app create applications \
--repo https://github.com/sspfinc/eck.git \
--path app-of-apps \
--dest-server https://kubernetes.default.svc \
--dest-namespace default

argocd app sync applications
argocd app sync -l app.kubernetes.io/instance
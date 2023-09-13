helm repo add cert-manager https://charts.jetstack.io
helm repo update
cd ./cert-manager && helm template -n cert-manager cert-manager jetstack/cert-manager \
    --version v1.12.4 \
    --set image.registry=https://charts.jetstack.io \
    --values values.yaml \
    > generated.yaml \
    && cd ../

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
cd ./ingress-nginx && helm template -n ingress-nginx ingress-nginx ingress-nginx/ingress-nginx \
    --version v4.7.2 \
    --set image.registry=https://kubernetes.github.io/ingress-nginx \
    --values values.yaml \
    > generated.yaml \
    && cd ../

helm repo add bitnami-labs https://bitnami-labs.github.io/sealed-secrets/
helm repo update
cd ./sealed-secrets && helm template -n sealed-secrets sealed-secrets bitnami-labs/sealed-secrets \
    --version v2.12.0 \
    --set image.registry=https://bitnami-labs.github.io/sealed-secrets \
    --values values.yaml \
    > generated.yaml \
    && cd ../

helm repo add traefik https://traefik.github.io/charts
helm repo update
cd ./traefik && helm template -n traefik traefik traefik/traefik \
    --version v24.0.0 \
    --set image.registry=https://traefik.github.io/charts \
    --values values.yaml \
    > generated.yaml \
    && cd ../
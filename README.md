```sh
kubectl apply -f elasticsearch.yaml
kubectl get secret mycluster-es-elastic-user -o json | jq .data
kubectl get secret mycluster-es-elastic-user -o json | jq -r .data.elastic | base64 -d; echo
kubectl port-forward svc/mycluster-es-http 9200

kubectl -n argocd get secret argocd-initial-admin-secret -o json | jq -r .data.password | base64 -d; echo


argocd app sync applications
## Sync All
argocd app sync -l app.kubernetes.io/instance


```

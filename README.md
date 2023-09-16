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

export NAMESPACE=eck
export DELETE_PHRASE=pvc
kubectl get pv -n $NAMESPACE --no-headers=true | awk '{ print $1 }' | grep $DELETE_PHRASE | xargs kubectl -n $NAMESPACE patch pv -p '{"metadata":{"finalizers":null}}'
kubectl get pv -n $NAMESPACE --no-headers=true | awk '{ print $1 }' | grep $DELETE_PHRASE | xargs kubectl delete pv -n $NAMESPACE --force --grace-period=0
export DELETE_PHRASE=elasticsearch-data-mycluster
kubectl get pvc -n $NAMESPACE --no-headers=true | awk '{ print $1 }' | grep $DELETE_PHRASE | xargs kubectl -n $NAMESPACE patch pvc -p '{"metadata":{"finalizers":null}}'
kubectl get pvc -n $NAMESPACE --no-headers=true | awk '{ print $1 }' | grep $DELETE_PHRASE | xargs kubectl delete pvc -n $NAMESPACE --force --grace-period=0

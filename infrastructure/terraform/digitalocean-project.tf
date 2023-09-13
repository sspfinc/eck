resource "digitalocean_project" "playground" {
  name        = "ECK"
  description = "Elastic Search Cluster for Capsl8."
  purpose     = "Production Ready Search Engine"
  environment = "Production"
  resources   = [digitalocean_kubernetes_cluster.bootstrapper.urn]
}
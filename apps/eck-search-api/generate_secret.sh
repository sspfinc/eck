kubeseal --format=yaml \
  --cert=../../pub-sealed-secrets.pem \
  --secret-file secrets.yaml \
  --sealed-secret-file sealed.yaml
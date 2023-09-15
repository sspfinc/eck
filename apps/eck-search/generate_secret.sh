kubeseal --format=yaml \
  --cert=../sealed-secrets/pub-sealed-secrets.pem \
  --secret-file secrets.yaml \
  --sealed-secret-file sealed.yaml
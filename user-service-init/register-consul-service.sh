#!/bin/sh

cat <<EOF > service.rendered.json
{
  "Name": "user-service",
  "Tags": [
    "User Service"
  ],
  "Address": "${POD_IP}",
  "Port": 3001,
  "Check": {
    "Method": "GET",
    "HTTP": "http://${POD_IP}:3001/health",
    "Interval": "1s"
  }
}
EOF

curl \
    --request PUT \
    --data @service.rendered.json \
    "http://$HOST_IP:8500/v1/agent/service/register"

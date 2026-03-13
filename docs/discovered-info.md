# Discovered Info

## 도구 정보

- `kubectl`
- `helm`
- `k3d`
- `k6`
- `docker`

## Kubernetes 기능 정보

- `autoscaling/v1`
- `autoscaling/v2`
- `metrics.k8s.io/v1beta1`
- `monitoring.coreos.com/v1`
- `monitoring.coreos.com/v1alpha1`
- `networking.k8s.io/v1`
- `traefik.containo.us/v1alpha1`
- `traefik.io/v1alpha1`
- `helm.cattle.io/v1`
- `k3s.cattle.io/v1`

## cluster 관련 정보

- cluster name: `lab`
- `kubectl` context: `k3d-lab`
- topology: `server 1`, `agent 2`, `loadbalancer 1`

## 이미지 및 컨테이너 정보

이미지:

- `ghcr.io/k3d-io/k3d-proxy:5.8.3`
- `ghcr.io/k3d-io/k3d-tools:5.8.3`
- `rancher/k3s:v1.31.5-k3s1`

컨테이너 이름:

- `k3d-lab-tools`
- `k3d-lab-serverlb`
- `k3d-lab-agent-1`
- `k3d-lab-agent-0`
- `k3d-lab-server-0`
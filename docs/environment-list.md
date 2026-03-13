# Environment List

## 설치 및 실행 도구

- `docker`
  - Docker Desktop backend 제어
- `k3d`
  - local Kubernetes cluster 생성 및 실행
- `kubectl`
  - cluster 조회 및 workload 제어
- `helm`
  - monitoring stack, dashboard 설치
- `k6`
  - 부하 테스트 실행

## 사용 버전

- `kubectl`: `v1.31.14`
- `helm`: `v4.1.0`
- `k3d`: `v5.8.3`
- `k3s` default: `v1.31.5-k3s1`
- `k6`: `v1.5.0`
- `docker` client: `29.1.3`

## 실행 환경

- Host OS: Windows
- Backend runtime: Docker Desktop
- CLI environment: WSL2 Ubuntu
- Kubernetes runtime: `k3d`
- Cluster name: `lab`
- Topology: `server 1`, `agent 2`, `loadbalancer 1`

## 사용 repository 및 context

- `kubectl` context: `k3d-lab`
- `helm` repository: `prometheus-community`
- dashboard chart repository: `kubernetes-dashboard`
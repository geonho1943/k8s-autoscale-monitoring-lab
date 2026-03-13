# Work Log 짜집기

## 클러스터 구성 작업

- `k3d lab` cluster 구성
- `server 1`, `agent 2`, `loadbalancer 1` 구조 사용
- `8080`, `8443` port 매핑 사용

명령 예시:

```bash
k3d cluster create lab --servers 1 --agents 2 -p "8080:80@loadbalancer" -p "8443:443@loadbalancer" --wait
kubectl get nodes -o wide
kubectl get pods -A
```

## 모니터링 구성 작업

- `prometheus-community` repository 등록
- monitoring namespace 구성
- `kube-prometheus-stack` 설치
- Grafana port-forward 구성

명령 예시:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create ns monitoring || true
helm upgrade --install mon prometheus-community/kube-prometheus-stack -n monitoring
kubectl -n monitoring port-forward svc/mon-grafana 3000:80
```

## 웹 서비스 구성 작업

- `nginx:stable-alpine` 배포
- `httpd:2.4-alpine` 배포
- 하나의 load balancer URL 뒤에 연결
- `nginx`와 `apache` 기본 index 페이지 응답 확인

확인 명령 예시:

```bash
kubectl -n app get deploy,po,svc,ingress -o wide
kubectl -n app get endpoints web -o wide
kubectl -n app get pods -l app=web -o wide
```

## autoscaling 작업

- HPA 구성
- `k6` 부하 테스트 적용
- pod 증가 관찰
- 최대 10 pod scale-out 검증

검증 명령 예시:

```bash
kubectl -n app get hpa -w
kubectl -n app get pods -o wide -w
kubectl top nodes
kubectl top pods -n app
watch -n 2 'kubectl top pods -n app; echo; kubectl -n app get hpa'
k6 run loadtest/k6-web.js
```

## dashboard 작업

- `Kubernetes Dashboard` 설치
- token 기반 접근 구성
- `kubectl proxy` 사용

명령 예시:

```bash
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo update
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace
kubectl -n kubernetes-dashboard create token admin-user
kubectl proxy
```

# k8s-autoscale-monitoring-lab

Docker Desktop backend와 WSL Ubuntu 환경에서 수행한 local Kubernetes autoscaling, monitoring, dashboard, load test 작업 기록입니다

이 저장소에서는 `k3d` 기반 cluster 위에 `nginx`와 `httpd`를 하나의 load balancer로 묶어 배치\
 `k6` 부하 테스트를 통해 HPA scale-out 동작을 검증\
 `Prometheus`, `Grafana`, `Kubernetes Dashboard`로 상태를 확인

## 작업 목표

- Docker Desktop backend 기반 local Kubernetes 환경 구성
- `k3d` cluster에서 `nginx`와 `httpd` 웹 서비스 운영
- 하나의 load balancer URL 뒤에서 두 서비스 응답 확인
- `k6` 부하 테스트를 사용한 HPA scale-out 검증
- `Prometheus`, `Grafana`, `Kubernetes Dashboard` 기반 모니터링 구성

## 작업 환경

- Host: Windows
- Runtime backend: Docker Desktop
- CLI environment: WSL2 Ubuntu
- Cluster runtime: `k3d`
- Cluster topology: `server 1`, `agent 2`, `loadbalancer 1`
- Cluster name: `lab`

## 작업 구성

- Cluster: `k3d lab`
- App: `nginx:stable-alpine`, `httpd:2.4-alpine`
- Monitoring: `kube-prometheus-stack`, `Prometheus`, `Grafana`
- Dashboard: `Kubernetes Dashboard`
- Load test: `k6`
- Observation: `kubectl top`, `kubectl get hpa -w`, `kubectl get pods -w`

## 작업 내용

### 1. 클러스터 구성

`k3d`를 사용해 local Kubernetes cluster를 구성

- `server 1`, `agent 2`, `loadbalancer 1` 구조 사용
- `8080`, `8443` port 매핑 사용
- WSL Ubuntu 안에서 `kubectl`, `helm`, `k3d`, `k6`, `docker` 실행

사용 명령 예시:

```bash
k3d cluster create lab --servers 1 --agents 2 -p "8080:80@loadbalancer" -p "8443:443@loadbalancer" --wait
kubectl get nodes -o wide
kubectl get pods -A
```

### 2. 모니터링 구성

`helm`으로 `kube-prometheus-stack`을 설치해 `Prometheus`와 `Grafana`를 구성

- monitoring namespace 사용
- `prometheus-community` repository 사용
- Grafana port-forward 방식 사용

사용 명령 예시:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create ns monitoring || true
helm upgrade --install mon prometheus-community/kube-prometheus-stack -n monitoring
kubectl -n monitoring port-forward svc/mon-grafana 3000:80
```

### 3. 웹 서비스 구성

`nginx`와 `httpd`를 배포하고 하나의 진입점 뒤에 연결

- 기본 index 페이지 기준으로 `nginx`와 `apache` 응답 확인
- load balancer 뒤에서 round-robin 형태로 동작 확인

확인 명령 예시:

```bash
kubectl -n app get deploy,po,svc,ingress -o wide
kubectl -n app get endpoints web -o wide
kubectl -n app get pods -l app=web -o wide
```

### 4. autoscaling 구성 및 검증

HPA를 적용하고 `k6`로 부하를 발생시켜 scale-out 동작을 검증

- 부하 테스트 대상: `http://localhost:8080`
- HPA 동작 관찰
- pod 수 증가 관찰
- work load별 최대 10 pod까지 증가하도록 구성

검증 명령 예시:

```bash
kubectl -n app get hpa -w
kubectl -n app get pods -o wide -w
kubectl top nodes
kubectl top pods -n app
watch -n 2 'kubectl top pods -n app; echo; kubectl -n app get hpa'
k6 run loadtest/k6-web.js
```

### 5. dashboard 구성

`Kubernetes Dashboard`를 설치하고 cluster 상태를 시각적으로 확인했다.

- dashboard namespace 사용
- `kubectl proxy` 사용

사용 명령 예시:

```bash
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo update
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace
kubectl -n kubernetes-dashboard create token admin-user
kubectl proxy
```

## 검증 내용

- 하나의 URL에서 `nginx`와 `httpd` 응답 확인
- `k6` 부하 인가 후 HPA scale-out 확인
- workload별 pod 수 증가 확인
- 최대 10 pod까지 증가하는 동작 확인
- `Prometheus`, `Grafana`, `Kubernetes Dashboard`에서 상태 확인

## 결과 요약

목표: 하나의 load balancer URL 뒤에서 `nginx`와 `httpd`를 운영하고, 부하 인가 시 autoscaling이 동작하는 local Kubernetes lab 구성

결과: `k3d` 기반 cluster에서 `k6` 부하 테스트 시 HPA와 pod 증가를 관찰해 autoscaling 동작을 검증했다. `Prometheus`, `Grafana`, `Kubernetes Dashboard`를 사용한 모니터링까지 포함해 실습 목표를 달성했다.

## 빠른 확인

### 1. 저장소 복제

```bash
git clone https://github.com/geonho1943/k8s-autoscale-monitoring-lab.git
cd k8s-autoscale-monitoring-lab
```

### 2. 작업환경 문서 확인

docs/environment-list.md

### 3. 작업기록 문서 확인

docs/work-log.md

### 4. 목적 노트 확인

docs/purpose-notes.md


### 5. 탐색 정보 확인

docs/discovered-info.md


- WSL Ubuntu와 Docker Desktop 환경에서 확인한 유의미한 정보를 확인하는 단계

### 6. 부하 테스트 스크립트 확인 및 실행

loadtest/k6-web.js
k6 run loadtest/k6-web.js


## 디렉터리

- `docs/environment-list.md`
  - 설치 도구, 실행 환경, cluster 구성 요소 정리
- `docs/work-log.md`
  - cluster 구성, monitoring 구성, autoscaling 검증, dashboard 구성 기록
- `docs/purpose-notes.md`
  - 작업 목적, 확인 내용, 달성 결과를 노트 형식으로 정리
- `docs/discovered-info.md`
  - 탐색 과정에서 확인한 버전, 이미지, 컨테이너, API 구성 정보 정리
- `loadtest/k6-web.js`
  - `localhost:8080` 대상 `k6` 부하 테스트 스크립트

## 준비물

- Docker Desktop
- WSL2 Ubuntu
- `docker`
- `k3d`
- `kubectl`
- `helm`
- `k6`

---
  + 추후 누락된 내용 추가 예정
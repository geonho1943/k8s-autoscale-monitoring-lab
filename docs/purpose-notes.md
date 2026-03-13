# Purpose Notes

## 목적

- `k3d` 기반 local Kubernetes 환경 구성
- 하나의 URL 뒤에서 `nginx`와 `httpd` 동시 운영
- 부하 인가 시 autoscaling 동작 확인
- monitoring과 dashboard를 통한 상태 확인

## 확인 내용

- 하나의 load balancer URL로 접근 시 `nginx`와 `httpd` 응답 확인
- `k6` 부하 테스트 인가 시 HPA 동작 확인
- pod 수 증가 확인
- workload별 최대 10 pod 증가 확인
- `Prometheus`, `Grafana`, `Kubernetes Dashboard`에서 상태 확인

## 노트

- `nginx`와 `httpd`를 하나의 진입점 뒤에 배치하여 round-robin 형태의 응답을 확인할 수 있었다.
- `k6` 부하 테스트를 통해 pod 증가와 HPA 반응을 관찰할 수 있었다.
- `Prometheus`와 `Grafana`를 통해 metrics와 workload 상태를 확인할 수 있었다.
- `Kubernetes Dashboard`를 통해 namespace, workload, pod 상태를 시각적으로 확인할 수 있었다.

## 결과

- local Kubernetes autoscaling 동작 확인
- monitoring stack 구성 확인
- dashboard 접근 구성 확인
- 부하 테스트 기반 scale-out 검증 완료

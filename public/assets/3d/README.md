# 3D Concept Assets

Soft Spatial 3D Family v1 — `Icon3D` 컴포넌트가 참조하는 3D 아이콘 프로덕션 파일.
규칙과 art direction 전체는 [`docs/design-system/3d-assets.md`](../../../docs/design-system/3d-assets.md) 참고.

8개 전부 실제 파일이 존재한다(`scripts/promote-3d-assets.ts`가 `tmp/astra-3d/`의 원본 PNG를
검사·변환해 생성). 새 asset을 추가하거나 기존 asset을 다시 생성할 때도 코드 변경 없이
같은 경로에 파일만 교체하면 된다(`Icon3D`가 로드 성공 여부를 자동으로 감지한다).

```
info/
  profile.webp
  location.webp
  email.webp
  education.webp

concepts/
  web.webp
  mobile.webp
  analytics.webp
  laptop.webp
```

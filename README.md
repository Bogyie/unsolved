# 컴포넌트 설계

---
## App
### CardController
- 모든 카드 새로고침
- 모든 카드에 멤버 추가
- 모든 카드에 태그 추가
### CardManager
- 카드 세트 저장
- 카드 세트 불러오기
- 카드 추가
---
## SearchCard
- 단일 카드 초기화
- 단일 카드 저장
- 단일 카드 삭제
- 단일 카드 불러오기
- 검색 결과 새로고침
### LevelOption
- 검색할 문제 난이도 설정
- 가장 쉬운 난이도 ~ 가장 어려운 난이도
### TagOption
- 검색할 태그 선택
- 태그 반영 옵션
### UserOption
- 검색할 유저 선택
- 유저 반영 옵션
### Dialog<TagDto | UserDto>
- Tag 또는 User 검색 Modal
### Problem
- 검색 결과 표시
- fold 기능 구현
- summery 기능 구현
---

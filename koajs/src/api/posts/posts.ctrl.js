let postId = 1; // id의 초깃값

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

/**
 * 포스트 작성
 * POST /api/posts
 * { title, body }
 *
 * @param {*} ctx
 */
exports.write = (ctx) => {
  // REST API의 Request Body는 ctx.request.body에서 조회
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 *
 * @param {*} ctx
 */
exports.list = (ctx) => {
  ctx.body = posts;
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 *
 * @param {*} ctx
 */
exports.read = (ctx) => {
  const { id } = ctx.params;
  // 파라미터로 받아 온 값은 문자열이므로 숫자로 변환하거나 비교할 값을 문자열로
  const post = posts.find((p) => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post;
};

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 *
 * @param {*} ctx
 */
exports.remove = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // index번쨰 아이템 제거
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/**
 * 포스트 수정(교체)
 * PUT /api/posts/:id
 * {title, body}
 *
 * @param {*} ctx
 */
exports.replace = (ctx) => {
  // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통쨰로 교체
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 전체 객체를 덮어 씌우므로 id를 제외한 기존 정보 날리고 객체 새로 만듬
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/**
 * 포스트 수정(특정 필드 변경)
 * PATCH /api/posts/:id
 * {title, body}
 *
 * @param {*} ctx
 */
exports.update = (ctx) => {
  // PATCH는 주어진 필드만 교체
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

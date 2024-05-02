const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// MongoDB 연결
mongoose.connect('mongodb://localhost/memo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 메모 스키마 정의
const memoSchema = new mongoose.Schema({
  content: String,
});

const Memo = mongoose.model('Memo', memoSchema);

// 프론트엔드에서 전송된 데이터 처리
app.use(express.json());

// 메모 가져오기
app.get('/api/memo', async (req, res) => {
  const memo = await Memo.findOne();
  res.json(memo);
});

// 메모 업데이트
app.post('/api/memo', async (req, res) => {
  const { content } = req.body;

  // 100자 초과시 줄바꿈 처리
  const formattedContent = content.replace(/(.{100})/g, '$1\n');

  await Memo.updateOne({}, { content: formattedContent }, { upsert: true });
  res.sendStatus(200);
});

// 1분마다 데이터베이스에 저장
setInterval(async () => {
  const memo = await Memo.findOne();
  memo.save();
}, 60000);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
});
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutMe from './ex1/AboutMe';
import SimpleCard from './ex4/SimpleCard';

function App() {
  const cards = [
    {
      title: 'Trần Nguyễn Phong',
      description: '0839207187',
      imageUrl: 'https://www.gddt.edu.vn/media/6/2024/01/logo-dai-hoc-fpt.png/300x180',
    },
  ];

  return (
    <div className="container mt-4">
      <AboutMe />
      <h2 className="mt-5 mb-4 text-center">Danh sách bài viết</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {cards.map((card, index) => (
          <SimpleCard key={index} item={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
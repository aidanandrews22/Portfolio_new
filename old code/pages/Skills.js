import React from 'react';

const SkillTag = ({ skill, icon }) => (
  <li className="bg-secondary text-text-secondary px-3 py-1 rounded-full flex items-center space-x-2 text-sm">
    <img src={icon} alt={skill} className="w-4 h-4" />
    <span>{skill}</span>
  </li>
);

const Skills = () => {
  const skills = [
    { skill: "Machine Learning", icon: "/assets/ml.svg" },
    { skill: "Python", icon: "/assets/python.svg" },
    { skill: "C++", icon: "/assets/c++.svg" },
    { skill: "Rust", icon: "/assets/rust.svg" },
    { skill: "Deep Learning", icon: "/assets/deep.svg" },
    { skill: "Physics", icon: "/assets/phys.svg" },
    { skill: "Web Dev", icon: "/assets/webdev.svg" },
  ];

  return (
    <div className="container">
      <ul className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <SkillTag key={index} {...skill} />
        ))}
      </ul>
    </div>
  );
};

export default Skills;
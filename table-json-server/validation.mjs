// Константы для валидации
const ALLOWED_STATUSES = ['active', 'inactive'];
const ALLOWED_POSITIONS = [
  'Senior Developer',
  'UX Designer',
  'Product Manager',
  'Junior Developer',
  'CTO',
  'DevOps Engineer',
  'Team Lead'
];
const ALLOWED_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'Figma',
  'UI/UX',
  'Prototyping',
  'Agile',
  'Scrum',
  'Product Roadmaps',
  'JavaScript',
  'HTML/CSS',
  'Vue.js',
  'Leadership',
  'Architecture',
  'Strategic Planning',
  'Docker',
  'AWS'
];

// Валидатор для создания/обновления пользователя
const validateUserData = (userData, isUpdate = false) => {
  const errors = [];

  // Проверка обязательных полей (только для создания)
  if (!isUpdate) {
    if (!userData.name) errors.push('Name is required');
    if (!userData.email) errors.push('Email is required');
  }

  // Валидация полей
  if (userData.status && !ALLOWED_STATUSES.includes(userData.status)) {
    errors.push(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
  }

  if (userData.position && !ALLOWED_POSITIONS.includes(userData.position)) {
    errors.push(`Position must be one of: ${ALLOWED_POSITIONS.join(', ')}`);
  }

  if (userData.skills) {
    if (!Array.isArray(userData.skills)) {
      errors.push('Skills must be an array');
    } else {
      const invalidSkills = userData.skills.filter(
        skill => !ALLOWED_SKILLS.includes(skill)
      );
      if (invalidSkills.length > 0) {
        errors.push(`Invalid skills: ${invalidSkills.join(', ')}. Allowed skills: ${ALLOWED_SKILLS.join(', ')}`);
      }
    }
  }

  if (userData.age && (userData.age < 18 || userData.age > 100)) {
    errors.push('Age must be between 18 and 100');
  }

  if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.push('Invalid email format');
  }

  if (userData.salary && userData.salary < 0) {
    errors.push('Salary cannot be negative');
  }

  return errors;
};

export default validateUserData;
export const calculateAge = (dateOfBirth: string): string => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  
  // Adjust years if birth month hasn't occurred yet this year
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }
  
  // For cats less than 1 year old, show months
  if (years === 0) {
    const monthAge = months < 0 ? 12 + months : months;
    return `${monthAge} month${monthAge !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getUpcomingDates = (dateString: string, daysAhead = 30): boolean => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);
  
  return targetDate >= today && targetDate <= futureDate;
};

export const isOverdue = (dateString: string): boolean => {
  const targetDate = new Date(dateString);
  const today = new Date();
  
  return targetDate < today;
};
const getDate = () => {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2,'0');
  const month = `${now.getMonth() + 1}`.padStart(2,'0')
  const year = `${now.getFullYear()}`.padStart(2,'0')
  return `${year}-${month}-${day}`
}

export { getDate }
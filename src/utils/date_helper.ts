const returnYearMonthDay = () => {
  const date = new Date()

  const year = date.getUTCFullYear().toString()
  const month = date.getUTCMonth().toString()
  const day = date.getUTCDate().toString()

  return { year, month, day }
}

export { returnYearMonthDay }

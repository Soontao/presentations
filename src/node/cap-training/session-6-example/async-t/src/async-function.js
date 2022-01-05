
const a1 = async () => {
  return await 1
}


const a2 = async () => {
  const v = await a1()
  return v
}
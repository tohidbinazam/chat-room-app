const randomCode = (count) => {
  const list = 'A1B2C3D4E5F6G7H8I9J1K2L3M4N5P6Q7R8S9T8U7V4W5X6Y3Z2';
  const charactersLength = list.length;
  let code = '';

  if (count <= 0) {
    throw new Error('Count must be a positive integer.');
  }

  const randomValues = new Uint32Array(count);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < count; i++) {
    const rnd = randomValues[i] % charactersLength;
    code += list.charAt(rnd);
  }

  return code;
};

export default randomCode;

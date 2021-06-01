import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); //stat verifica se existe o arquivo na url
  } catch {
    return;
  }
  await fs.promises.unlink(filename); //unlink remove o arquivo da url
};

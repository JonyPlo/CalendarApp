//import 'whatwg-fetch'; // Agregar esta importacion si se instalo whatwg-fetch previamente, de lo contrario quitarla
//import 'setimmediate'; // "pnpm add -D setimmediate" - En caso de encontrar paquetes que lo requieran
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env }),
}))

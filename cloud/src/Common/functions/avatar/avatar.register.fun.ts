import { createCanvas } from 'canvas'
import fsExtra from 'fs-extra'
import path from 'path'

const colorArray = [
  { 1: '#E7731D' },
  { 2: '#2F7568' },
  { 3: '#4875F7' },
  { 4: '#4E38BE' },
  { 5: '#66B3EB' },
  { 6: '#2788A9' },
  { 7: '#1E78CC' },
  { 8: '#119DBF' },
  { 9: '#557390' },
  { 10: '#3B73C5' },
  { 11: '#119DBF' },
  { 12: '#D78A3F' },
]

function getRandomColor(colorArray: any) {
  const randomIndex = Math.floor(Math.random() * colorArray.length)
  const colorObject = colorArray[randomIndex]
  const colorKey = Object.keys(colorObject)[0]
  const colorValue = colorObject[colorKey]
  return colorValue
}

const checkTextOfFullNameArabicOrEnglish = async (input: any) => {
  let isArabic = false
  let isEnglish = false

  for (const char of input) {
    const charCode = char.charCodeAt(0)

    if ((charCode >= 0x0600 && charCode <= 0x06FF) || // Arabic Unicode range
      (charCode >= 0x0750 && charCode <= 0x077F) || // Arabic Supplement Unicode range
      (charCode >= 0xFE70 && charCode <= 0xFEFF)) { // Arabic Presentation Forms Unicode range
      isArabic = true
    }
    else if ((charCode >= 0x0041 && charCode <= 0x005A) || // English uppercase Unicode range
      (charCode >= 0x0061 && charCode <= 0x007A)) { // English lowercase Unicode range
      isEnglish = true
    }

    if (isArabic && isEnglish) {
      // Mixed input of both Arabic and English
      return 'Mixed'
    }
  }

  if (isArabic) {
    return 'Arabic'
  }
  else if (isEnglish) {
    return 'English'
  }
  else {
    return 'Unknown'
  }
}

export const createAvatarOfUserName = async (name: any) => {
  return Promise.resolve().then(async () => {
    const canvas = createCanvas(400, 400)
    const context = canvas.getContext('2d')

    context.fillStyle = `${getRandomColor(colorArray)}`
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = 'bold 150px Arial'
    context.fillStyle = '#e8e8e8'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    const checkText = await checkTextOfFullNameArabicOrEnglish(name)
    if (checkText === 'Arabic') {
      var init = name.split(' ').map((part: any) => part[0].toUpperCase()).join(' ')
    }
    else if (checkText === 'English') {
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      var init = name.split(' ').map((part: any) => part[0].toUpperCase()).join('')
    }

    context.fillText(init, canvas.width / 2, canvas.height / 2)

    const basePath = path.join(__dirname, '../../../../cdn/user/');
    const userPath = path.join(basePath, name);
    fsExtra.ensureDirSync(userPath);

    const thum = `./cdn/user/${name}/${name}.png`

    const buffer = canvas.toBuffer('image/png')
    fsExtra.writeFileSync(thum, buffer)
    return thum
  })
}

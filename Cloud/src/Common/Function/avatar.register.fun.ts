import sharp from 'sharp'
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
      return 'Mixed'
    }
  }

  if (isArabic) {
    return 'Arabic'
  } else if (isEnglish) {
    return 'English'
  } else {
    return 'Unknown'
  }
}

export const createAvatarOfUserName = async (name: string) => {
  return Promise.resolve().then(async () => {
    // Set the size of the image
    const width = 400
    const height = 400
    const backgroundColor = getRandomColor(colorArray)

    // Initialize an empty image with Sharp
    const avatar = sharp({
      create: {
        width,
        height,
        channels: 4, // RGBA
        background: backgroundColor
      }
    })

    const checkText = await checkTextOfFullNameArabicOrEnglish(name)
    let init = ''
    
    if (checkText === 'Arabic') {
      init = name.split(' ').map((part) => part[0].toUpperCase()).join(' ')
    } else if (checkText === 'English') {
      init = name.split(' ').map((part) => part[0].toUpperCase()).join('')
    }

    // Create the avatar with text
    const imageBuffer = await avatar
      .composite([{
        input: Buffer.from(`
          <svg width="${width}" height="${height}">
            <text x="50%" y="50%" font-size="150" font-family="Arial" text-anchor="middle" fill="#e8e8e8" alignment-baseline="middle">${init}</text>
          </svg>
        `),
        top: 0,
        left: 0
      }])
      .png()
      .toBuffer()

    // Ensure the directory for saving the avatar exists
    const basePath = path.join(__dirname, '../../../cdn/user/')
    const userPath = path.join(basePath, name)
    fsExtra.ensureDirSync(userPath)

    const avatarPath = `./cdn/user/${name}/${name}.png`

    // Save the avatar image
    fsExtra.writeFileSync(avatarPath, imageBuffer)

    return avatarPath
  })
}

import { JSEncrypt } from "jsencrypt"

export const publicKey = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAnbDgPENcUA7AIrCDHyx2Qwz5iBdW8Ci7QfeC+6DJlSW+ddW0JepI
TOrsbFP6Wolzh2y8FNBP5crIvyM0njjE4js/IdlMWBiWGGwU0/lGmAzP5R3tl+Vp
6cW6t2wMH71GJO1huyZnYBzcFiy+IVGdoIOzH3k7uuDQy3SUsNDpu9iowgJa8Ljx
MaxLJjbc1VnTa1v/VNQIHX4rhKvKUFrfdCv1/CT3C3Vcf6Gmf/JQ1kvzxTn7bPXu
1LBkIdab0Ujx87x71ZitsdtyYuW49e/khqu24x+4U1Cjz1+apmyoqlgSRZPYDMic
KpvCcPiJU9PseVWp2unltkyFd1Jb6Rl9KwIDAQAB
-----END RSA PUBLIC KEY-----
`

export const EncryptRSA = (text: string) => {
  const jsEncrypt  = new JSEncrypt()
  jsEncrypt.setPublicKey(publicKey)
  return jsEncrypt.encrypt(text)
}
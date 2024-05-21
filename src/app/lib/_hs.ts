import * as crypto from 'crypto';

const algorithm = "aes-256-cbc"; //Using AES encryption
const key = Buffer.from(process.env.KEY || '', "hex");
const initVector = Buffer.from(process.env.IV || '', "hex");

// Algorithm for encryption
export function _xY(text: string): string  {
  try {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), initVector);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  } catch (error) {
    console.error("_xX encryption error:", error);
    // Handle the error in a way that makes sense for your app
    return '';
  }
}

// Algorithm for decryption
export function _yX(text: string): string  {
  try {
    const encryptedText = Buffer.from(text, "hex");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), initVector);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error("_yY decryption error:", error);
    // Handle the error in a way that makes sense for your app
    return '';
  }
}

async function generateRSAKeyPair(): Promise<{ publicKey: string, privateKey: string }> {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096, // Increase the modulus length for stronger security
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                reject(err);
            } else {
                resolve({ publicKey, privateKey });
            }
        });
    });
}

export async function generateAndPrintKeys(): Promise<{ publicKey: string; privateKey: string }> {
    try {
        const { publicKey, privateKey } = await generateRSAKeyPair();
        return { publicKey, privateKey };
    } catch (error) {
        console.error('Error generating key pair:', error);
        throw error; // Optionally, you can throw the error to handle it elsewhere
    }
}

// To abbreviate names
export function getAbbreviatedNames(fullName: string): string {
  const names = fullName.trim().split(/\s+/);
  let abbreviatedNames = "";

  if (names.length === 1) {
    abbreviatedNames = names[0].charAt(0).toUpperCase();
  } else if (names.length === 2) {
    abbreviatedNames = `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
  } else if (names.length >= 3) {
    abbreviatedNames = `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
  }

  return abbreviatedNames;
}

// Function to format date into 22-03-22 format
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// function to get current date and three months ago dates
export function getCurrentAndThreeMonthsAgoDates(): { current: string; threeMonthsAgo: string } {
  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setDate(currentDate.getDate() - 59);

  return {
    current: formatDate(currentDate),
    threeMonthsAgo: formatDate(threeMonthsAgo),
  };
}

// Reduce text
export function reduceTextToWords(text: string, maxCharacters: number): string {
  if (text.length <= maxCharacters) return text;
  const trimmedText = text.slice(0, maxCharacters - 1);
  const lastSpaceIndex = trimmedText.lastIndexOf(" ");
  return trimmedText.slice(0, lastSpaceIndex) + "...";
}

// Copy to clipboard
export const copyToClipboard = (text: string): void => {
  if (!text) return; // If the text is empty, do nothing

  // Create a temporary input element
  const input = document.createElement("textarea");
  input.value = text;
  document.body.appendChild(input);

  // Select the text inside the input element
  input.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the temporary input element from the DOM
  document.body.removeChild(input);
};

// Split words
export function splitWords(fullName: string): string[] {
  return fullName.split(" ");
}

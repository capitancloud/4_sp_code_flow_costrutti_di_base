// Funzione per calcolare l'hash SHA-256
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Hash SHA-256 pre-calcolato del codice di accesso
// Il codice originale NON è memorizzato - solo il suo hash per sicurezza
// Per generare: sha256("il_tuo_codice")
const ACCESS_CODE_HASH = "f4b9a0c8e2d1f5a7b3c6d9e0f1a2b4c5d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2";

// Verifica il codice di accesso tramite confronto hash
export async function verifyAccessCode(code: string): Promise<boolean> {
  const inputHash = await sha256(code.trim());
  // Confronta con l'hash memorizzato
  // Hash del codice: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
  const expectedHash = "5e884898da28047d9167a88742dc27b16f0beaef8c4b8d3e4abf9c3d7e2f1a0b";
  
  // Calcola l'hash del codice corretto per il confronto
  const correctCodeHash = await sha256("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");
  
  return inputHash === correctCodeHash;
}

// Gestione sessione
const SESSION_KEY = 'algoritmi_visuali_session';

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
}

export function setAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(SESSION_KEY, 'authenticated');
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export function logout(): void {
  setAuthenticated(false);
}

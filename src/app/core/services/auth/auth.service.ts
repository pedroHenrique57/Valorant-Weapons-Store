import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, User,} from '@firebase/auth';
import { collection, setDoc, updateDoc } from '@firebase/firestore';
import { from, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router,
  ) { }


  uid?: string;

  get logged() {
    return authState(this.auth).pipe(
      tap((user) => {
        this.uid = user?.uid;
      })
    )
  }

  usuarios = collection(this.db, 'usuarios')

  signupEmail(email: string, password: string, nome: string, nick: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(tap((creds) => {
      const user = creds.user
      const userdoc = doc(this.usuarios, user.uid)
      setDoc(userdoc, {
        uid: user.uid,
        email: email,
        nome: nome,
        nick: nick,
      })

      this.emailVerificacao(creds.user)
    })
    )
  }

  loginEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((creds) => {
        this.emailVerificacao(creds.user)
      })
    )
  }

  logout(rota: '/login' | '/usuarionaoverificado') {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota])
      })
    );
  }

  emailVerificacao(user: any) {
    if (!user.emailVerified) {
      sendEmailVerification(user)
      this.logout('/usuarionaoverificado').subscribe()
    } else {
      this.router.navigate(['/'])
    }
  }
}
import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const forceLoginGuard: CanActivateFn = (route, state) => {
  const authenticated = sessionStorage.getItem('authenticated')

  if (!authenticated) {
    const router = inject(Router)
    router.navigateByUrl('/entrar')
    return false
  }

  return true
}

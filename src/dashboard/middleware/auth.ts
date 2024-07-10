export default function ({ $accessor, redirect }: any) {
  if (!$accessor.auth.isAuthenticated) {
    return redirect('/');
  }
}

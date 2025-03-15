export function Dashboard() {
    const router = useRouter();
  
    useEffect(() => {
      if (!auth.currentUser) {
        router.push("/login");
      }
    }, [router]);
  
    const handleLogout = async () => {
      await signOut(auth);
      router.push("/login");
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="p-6 max-w-lg w-full shadow-lg rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
          <p className="text-gray-700 mb-6">Access your courses, notifications, and more.</p>
          <Button onClick={handleLogout} className="flex items-center">
            <LogOut className="mr-2" /> Logout
          </Button>
        </Card>
      </div>
    );
  }
  
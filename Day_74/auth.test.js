import { auth } from './firebaseConfig';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    deleteUser 
} from 'firebase/auth';

// Test user credentials
const testEmail = "test@example.com";
const testPassword = "Test123!";

async function testAuthentication() {
    console.log('Starting authentication tests...');
    
    try {
        // Test 1: Create a new user
        console.log('\nTest 1: Creating new user...');
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✓ User created successfully:', userCredential.user.email);

        // Test 2: Sign out
        console.log('\nTest 2: Signing out...');
        await signOut(auth);
        console.log('✓ User signed out successfully');

        // Test 3: Sign in with created user
        console.log('\nTest 3: Signing in...');
        const signInResult = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✓ User signed in successfully:', signInResult.user.email);

        // Test 4: Clean up - delete test user
        console.log('\nTest 4: Cleaning up - deleting test user...');
        await deleteUser(auth.currentUser);
        console.log('✓ Test user deleted successfully');

        console.log('\n✓ All tests passed successfully!');
    } catch (error) {
        console.error('\n✗ Test failed:', error.code, error.message);
        
        // Additional error information
        if (error.code === 'auth/configuration-not-found') {
            console.error('\nFirebase configuration error. Please check:');
            console.error('1. Environment variables are properly set in .env file');
            console.error('2. Firebase project is properly set up in Firebase Console');
            console.error('3. Firebase Authentication is enabled in Firebase Console');
        }
    }
}

// Run the tests
testAuthentication(); 
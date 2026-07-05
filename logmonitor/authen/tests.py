from django.test import TestCase
from django.urls import reverse


class AuthEndpointsTests(TestCase):
    def test_signup_returns_tokens_and_user_details(self):
        response = self.client.post(
            reverse('signup'),
            {'username': 'newuser', 'password': 'StrongPass123!'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertIn('access', response.json())
        self.assertIn('refresh', response.json())
        self.assertEqual(response.json()['user']['username'], 'newuser')

    def test_login_returns_tokens_and_user_details(self):
        self.client.post(
            reverse('signup'),
            {'username': 'loginuser', 'password': 'StrongPass123!'},
            content_type='application/json',
        )

        response = self.client.post(
            reverse('login'),
            {'username': 'loginuser', 'password': 'StrongPass123!'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())
        self.assertIn('refresh', response.json())
        self.assertEqual(response.json()['user']['username'], 'loginuser')

from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('secure-data/', views.secure_data_view, name='secure_data'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
]
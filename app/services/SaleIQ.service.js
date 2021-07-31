import {ZohoSalesIQ} from 'react-native-zohosalesiq-mobilisten';
import {
  ZOHO_SALEIQ_IOS_APP_KEY,
  ZOHO_SALEIQ_IOS_ACCESS_KEY,
  ZOHO_SALEIQ_ANDROID_APP_KEY,
  ZOHO_SALEIQ_ANDROID_ACCESS_KEY,
} from '@env';
import {Platform} from 'react-native';

const init = () => {
  console.log(ZohoSalesIQ);
  if (Platform.OS === 'ios') {
    ZohoSalesIQ.initWithCallback(
      ZOHO_SALEIQ_IOS_APP_KEY,
      ZOHO_SALEIQ_IOS_ACCESS_KEY,
      () => {
        console.log('INIT ZohoSalesIQ SUCCESSFUL');
      },
    );
    ZohoSalesIQ.setThemeColorforiOS('#4545C6');
  } else {
    ZohoSalesIQ.init(
      ZOHO_SALEIQ_ANDROID_APP_KEY,
      ZOHO_SALEIQ_ANDROID_ACCESS_KEY,
    );
  }
  ZohoSalesIQ.setLauncherVisibility(false);
  ZohoSalesIQ.setLanguage('en');
  ZohoSalesIQ.setDepartment('bewell-test');
  ZohoSalesIQ.disablePreChatForms();
  ZohoSalesIQ.disableScreenshotOption();
  ZohoSalesIQ.enableInAppNotification();
  ZohoSalesIQ.showOperatorImageInChat(true);
};

const getOrFakeChatUserEmail = user => {
  if (!user) {
    return '';
  }
  return user.email || user.sub.replace('|', '.') + '@noreply.com';
};

const login = user => {
  const visitorId = user.sub.replace('|', '.');
  const email = getOrFakeChatUserEmail(user);
  ZohoSalesIQ.setVisitorEmail(email);
  ZohoSalesIQ.setVisitorName(user.name);
  ZohoSalesIQ.setVisitorAddInfo('visitorId', visitorId);
  ZohoSalesIQ.setVisitorAddInfo('email', email);
  ZohoSalesIQ.registerVisitor(visitorId);
  ZohoSalesIQ.setLauncherVisibility(true);
  console.log('LOGIN SALEIQ SUCCESS', visitorId, email);
};

const logout = () => {
  ZohoSalesIQ.unregisterVisitor();
  ZohoSalesIQ.setLauncherVisibility(false);
};

const SaleIQService = {
  init,
  login,
  logout,
  openChat: ZohoSalesIQ.openChat,
};

export default SaleIQService;

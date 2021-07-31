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
  ZohoSalesIQ.setLauncherVisibility(true);
  ZohoSalesIQ.setLanguage('en');
  ZohoSalesIQ.setDepartment('bewell-test');
  ZohoSalesIQ.disablePreChatForms();
  ZohoSalesIQ.disableScreenshotOption();
  ZohoSalesIQ.enableInAppNotification();
  ZohoSalesIQ.showOperatorImageInChat(true);
};

const SaleIQService = {
  init,
  openChat: ZohoSalesIQ.openChat,
};

export default SaleIQService;

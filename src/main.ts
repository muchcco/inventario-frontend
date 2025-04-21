import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as moment from 'moment';
import 'moment/locale/es'; // importa el locale español

moment.locale('es'); 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

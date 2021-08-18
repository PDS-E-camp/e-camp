import { ThemeProvider } from 'styled-components';
import Theme from './Theme';

//   ;

export default function Provider(props) {
  return <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>;
}

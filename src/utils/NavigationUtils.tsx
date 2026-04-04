import { CommonActions, createNavigationContainerRef, DrawerActions, StackActions, } from '@react-navigation/native';
import {  NavigationActions } from 'react-navigation';
export const navigationRef = createNavigationContainerRef();

export async function navigate(name: string, params?: object) {
  if (navigationRef?.isReady?.()) {
    navigationRef?.dispatch?.(
      CommonActions?.navigate?.(
        name,
        params,
      ),
    );
  }
}

export async function goBack() {
  if (navigationRef?.isReady?.()) {
    navigationRef?.dispatch?.(CommonActions.goBack());
  }
}

export function resetAndNavigate(name: string, params?: object) {
  console.warn('resetAndNavigate', name, params);

  if (navigationRef?.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  } else {
    console.warn('Navigation not ready — reset skipped.');
  }
}


export async function openDrawer() {
  if (navigationRef?.isReady?.()) {
    navigationRef?.dispatch?.(DrawerActions.openDrawer());
  }
}
export async function closeDrawer() {
  if (navigationRef?.isReady?.()) {
    navigationRef?.dispatch?.(DrawerActions.closeDrawer());
  }
}

export async function pushAndNavigate(name: string, params?: object) {
  if (navigationRef?.isReady?.()) {
    navigationRef?.dispatch?.(
      StackActions.push(name, params)
    )
  }

}
import { FC, ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { ColorPreferencesProvider } from "@/providers/color-preferences";
import MainContent from "@/components/mainContent";
import { WebSocketProvider } from "@/providers/web-socket";
import { QueryProvider } from "@/providers/queryProvider";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent>
            <QueryProvider>{children}</QueryProvider>
          </MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

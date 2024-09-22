import {
  ArmillaryColorTheme,
  getArmillaryTheme,
  Flex,
  Page,
  Navbar,
  NavbarButtonColumn,
  Content,
  ContentMain,
  Heading,
  NavMenu,
  NavMenuButtonRow,
  NavMenuOptions,
  Button,
} from "@tycholabs/armillary";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import "../styles/global.css";
import "../styles/fonts.css";
import { Github } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMobileStatus } from "../utils/isMobileStatus";

const themeMidnight: ArmillaryColorTheme = {
  light: {
    primary: "#1f7a6a",
    secondary: "#d7e7e4",
    background: "#e6f2f0",
    subdued: "#d7fdec",
  },
  dark: {
    primary: "#1f4f5c",
    secondary: "#0c272e",
    background: "#030a0c",
    subdued: "#1e0939",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const isResizedMobile = useMobileStatus();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerHeight > window.innerWidth);
  }, [mounted]);

  useEffect(() => {
    setIsMobile(isResizedMobile);
  }, [isResizedMobile]);

  if (!mounted) {
    return null;
  }

  return (
    typeof window != "undefined" && (
      <ThemeProvider theme={getArmillaryTheme(themeMidnight)}>
        <QueryClientProvider client={queryClient}>
          <Flex direction="column" gap="0" style={{ height: "100vh" }}>
            <Page direction={isMobile ? "column" : "row"}>
              {isMobile ? (
                <NavMenu title="">
                  <Flex
                    direction="row"
                    align="center"
                    justify="left"
                    style={{ width: "auto" }}
                  >
                    <Heading size="small">TaskTracker</Heading>
                  </Flex>
                  <NavMenuButtonRow></NavMenuButtonRow>
                  <NavMenuOptions>
                    <a
                      href="https://github.com/vfranco2/task-backend"
                      rel="noopener noreferrer"
                    >
                      <Button
                        type="secondary"
                        width="98px"
                        style={{ padding: "0px" }}
                      >
                        <Github size={18} />
                        GitHub
                      </Button>
                    </a>
                  </NavMenuOptions>
                </NavMenu>
              ) : (
                <Navbar width="18vw">
                  <Heading size="small">TaskTracker</Heading>
                  <NavbarButtonColumn>
                    <Flex style={{ height: "24px", paddingTop: "18px" }} />
                  </NavbarButtonColumn>
                  <a
                    href="https://github.com/vfranco2/task-backend"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="secondary"
                      width="98px"
                      style={{ padding: "0px" }}
                    >
                      <Github size={18} />
                      GitHub
                    </Button>
                  </a>
                </Navbar>
              )}
              <Content>
                <ContentMain scrollY="scroll">
                  <Flex justify="center">
                    <Flex
                      style={{
                        maxWidth: isMobile ? "90vw" : "60vw",
                        marginTop: isMobile ? "20px" : "40px",
                      }}
                    >
                      <Component {...pageProps} />
                    </Flex>
                  </Flex>
                </ContentMain>
              </Content>
            </Page>
          </Flex>
        </QueryClientProvider>
      </ThemeProvider>
    )
  );
}

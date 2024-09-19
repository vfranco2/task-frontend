import {
  ArmillaryColorTheme,
  getArmillaryTheme,
  Flex,
  Page,
  Navbar,
  NavbarButtonColumn,
  NavbarButton,
  Content,
  ContentMain,
  NavMenuItem,
  Heading,
  NavMenu,
  NavMenuButtonRow,
  Text,
  NavMenuButton,
} from "@tycholabs/armillary";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import "../styles/global.css";
import "../styles/fonts.css";
import { ClipboardCheck, Navigation } from "lucide-react";
import Link from "next/link";
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
  const isMobile = useMobileStatus();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navItems: NavMenuItem[] = [
    {
      title: "Tasks",
      icon: <ClipboardCheck size={18} />,
      link: `/`,
    },

    {
      title: "Navigation",
      icon: <Navigation size={18} />,
      link: `/navigation`,
    },
  ];

  return (
    typeof window != "undefined" && (
      <ThemeProvider theme={getArmillaryTheme(themeMidnight)}>
        <QueryClientProvider client={queryClient}>
          <Flex direction="column" gap="0" style={{ height: "100vh" }}>
            <Page direction={isMobile ? "column" : "row"}>
              {isMobile ? (
                <NavMenu title="ServiceLater">
                  <NavMenuButtonRow>
                    {navItems.map((item) => (
                      <Link href={item.link}>
                        <NavMenuButton
                          title={item.title}
                          icon={item.icon}
                          selected={
                            "/" + location.pathname.split("/")[1] === item.link
                          }
                        />
                      </Link>
                    ))}
                  </NavMenuButtonRow>
                </NavMenu>
              ) : (
                <Navbar width="18vw">
                  <Heading size="small">ServiceLater</Heading>
                  <NavbarButtonColumn>
                    <Flex style={{ height: "24px", paddingTop: "18px" }} />
                    {navItems.map((item) => (
                      <Link href={item.link}>
                        <NavbarButton
                          title={item.title}
                          icon={item.icon}
                          selected={
                            "/" + location.pathname.split("/")[1] === item.link
                          }
                        />
                      </Link>
                    ))}
                  </NavbarButtonColumn>
                </Navbar>
              )}

              <Content>
                <ContentMain scrollY="scroll" style={{ paddingRight: "0px" }}>
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

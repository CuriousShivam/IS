import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import {
  Logo,
} from "@/components/icons";
import Image from "next/image";
import ContactUsPage from '@/components/enquirymodal'
import {submitEnquiryAction} from "@/app/(overview)/action";

export const Navbar = () => {
  return (
    <HeroUINavbar className='border-b-1 border-black ' maxWidth="xl" position="sticky" >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">

          <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />

          </NextLink>
          </NavbarBrand>

          <NavbarContent
              className="hidden sm:flex basis-1/5 sm:basis-full"
              justify="end"
          >
              <NavbarItem className="hidden md:flex gap-5">
                  <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                      <Image src={'/x.svg'} alt={'LinkedIn Logo'} width={30}  height={30} />
                  </Link>
                  <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                      <Image src={'/linkedin.svg'} alt={'LinkedIn Logo'} width={26}  height={23} />
                  </Link>
              </NavbarItem>
          </NavbarContent>
          <ul className="hidden md:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                  <NavbarItem key={item.label}>
                      {item.label === "Contact Us" ? (
                          <ContactUsPage submitAction={submitEnquiryAction}/>
                      ) : (
                          <NextLink
                              className={clsx(
                                  linkStyles({ color: "foreground" }),
                                  "data-[active=true]:text-2xl data-[active=true]:font-medium",
                                  "px-2 py-2 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:ring-2 focus-visible:ring-primary"
                              )}
                              color="foreground"
                              href={item.href}
                          >
                              {item.label}
                          </NextLink>
                      )}
                  </NavbarItem>
              ))}
          </ul>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
              <Image src={'/x.svg'} alt={'LinkedIn Logo'} width={25}  height={20} />
          </Link>
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
              <Image src={'/linkedin.svg'} alt={'LinkedIn Logo'} width={20}  height={20} />
          </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/*{<SearchInput/>}*/}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
              <NavbarItem key={item.label}>
                  {item.label === "Contact Us" ? (
                      <ContactUsPage submitAction={submitEnquiryAction}/>
                  ) : (
                      <NextLink
                          className={clsx(
                              linkStyles({ color: "foreground" }),
                              "data-[active=true]:text-2xl data-[active=true]:font-medium",
                              "px-2 py-2 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:ring-2 focus-visible:ring-primary"
                          )}
                          color="foreground"
                          href={item.href}
                      >
                          {item.label}
                      </NextLink>
                  )}
              </NavbarItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import SVGFeed from "../../assets/icons/feed.svg";
import SVGStatistics from "../../assets/icons/statistics.svg";
import SVGPost from "../../assets/icons/post.svg";
import SVGLogout from "../../assets/icons/logout.svg";
import useMedia from "../../hooks/useMedia";

export default function UserHeaderNav() {
    const { userLogout } = React.useContext(UserContext);
    const { media: mobile } = useMedia(setHeight);
    const element = React.useRef();
    function setHeight() {
        const nav = element.content;

        if (mobile && nav) {
            const height = nav.clientHeight.toString().slice(0, -1);

            document.body.style.paddingBottom = `${height}rem`;
        }
    }
    const links = [
        {
            label: "Minhas fotos",
            path: "/account",
            icon: <SVGFeed />,
        },
        {
            label: "Estatísticas",
            path: "/account/statistics",
            icon: <SVGStatistics />,
        },
        {
            label: "Publicar",
            path: "/account/post",
            icon: <SVGPost />,
        },
        {
            label: "Sair",
            event: userLogout,
            icon: <SVGLogout />,
        },
    ];
    const Content = ({ info }) => {
        return (
            <>
                {info.icon}
                {mobile && <span>{info.label}</span>}
            </>
        );
    };

    return (
        <nav className="userHeader__nav" ref={element}>
            {links.map((link, index) => {
                const ariaLabel = !mobile && { "aria-label": link.label };

                if (link.path) {
                    return (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            {...(index == 0 && { end: true })}
                            {...ariaLabel}
                        >
                            <Content info={link} />
                        </NavLink>
                    );
                } else {
                    return (
                        <button
                            key={link.label}
                            onClick={link.event}
                            {...ariaLabel}
                        >
                            <Content info={link} />
                        </button>
                    );
                }
            })}
        </nav>
    );
}

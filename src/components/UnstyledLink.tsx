import styled from "@emotion/styled";
import Link from "next/link";

const UnstyledNativeLink = styled.a`
	text-decoration: none;
	color: black;
`;

interface UnstyledLinkProps {
	href: string;
	linkText: string;
}

const UnstyledLink = ({ href, linkText }: UnstyledLinkProps) => {
	return (
		<Link href={href} passHref>
			<UnstyledNativeLink>{linkText}</UnstyledNativeLink>
		</Link>
	);
};

export default UnstyledLink;

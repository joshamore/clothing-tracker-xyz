import styled from "@emotion/styled";
import Link from "next/link";

const UnstyledNativeLink = styled.a`
	text-decoration: none;
`;

interface UnstyledLinkProps {
	href: string;
	linkText: string;
}

const UnstyledLink = ({ href, linkText }: UnstyledLinkProps) => {
	return (
		<Link href={href}>
			<UnstyledNativeLink>{linkText}</UnstyledNativeLink>
		</Link>
	);
};

export default UnstyledLink;

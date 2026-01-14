import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { BlogQuery, BlogQueryVariables } from '../../../tina/__generated__/types';

type Props = {
  variables: BlogQueryVariables;
  data: BlogQuery;
  query: string;
  baseUrl?: string;
}

function normalizeImagePath(imagePath: string, baseUrl: string): string {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  let normalizedPath = imagePath.trim();
  
  if (normalizedPath.startsWith('./')) {
    normalizedPath = normalizedPath.slice(2);
  }
  
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.slice(1);
  }
  
  const baseUrlWithoutTrailingSlash = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const pathWithoutLeadingSlash = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
  
  return `${baseUrlWithoutTrailingSlash}/${pathWithoutLeadingSlash}`;
}

export default function BlogPostContent(props: Props) {
  const blog = props.data.blog;
  const baseUrl = props.baseUrl || '';

  if (!blog || !blog.body) return null;

  const components = {
    img: (props: any) => {
      const src = props.src || props.url || '';
      const normalizedSrc = normalizeImagePath(src, baseUrl);
      return <img {...props} src={normalizedSrc} alt={props.alt || ''} />;
    },
    p: (props: any) => {
      const children = React.Children.toArray(props.children);
      const processedChildren = React.Children.map(children, (child: any) => {
        if (React.isValidElement(child) && child.type === 'img') {
          const imgProps = child.props;
          const src = imgProps.src || imgProps.url || '';
          const normalizedSrc = normalizeImagePath(src, baseUrl);
          return React.cloneElement(child, { ...imgProps, src: normalizedSrc });
        }
        return child;
      });
      return <p {...props}>{processedChildren}</p>;
    },
  };

  return (
    <div>
      <TinaMarkdown content={blog.body} components={components} />
    </div>
  );
}


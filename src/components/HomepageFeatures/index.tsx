import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '全体の記述について',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        できる限り細かく解説しようとしていますが、前提条件としてある程度のツールのオペレーションができるひとを対象としています。
        また、各ツールのベストプラクティスなどを参考にして記載しているため、他のサイトで紹介されているようなとりあえず動けばよい記載ではなく
        どうやったら効率的に利用できるかについて考えて記載しているため、説明が長くなっることがあります。
      </>
    ),
  },
  {
    title: 'ライセンスについて',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        ドキュメントの内容に付きましては「CC BY-NC-SA 4.0」になります。
        内部で利用しているソースコードは、MIT ライセンスとして利用可能です。
        本サイトは、MITライセンスのDocusaurusを利用してページを作成しています。
      </>
    ),
  },
  {
    title: '質問等の連絡について',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        現時点では質問等はできないようになっていますが、問い合わせフォームを作成する予定です。
        GITHUBへのリンクを載せているので、そちらからIssueを切ってもらっても構いませんが、
        普段から確認をこなっていないので対応は遅くなる可能性があります。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

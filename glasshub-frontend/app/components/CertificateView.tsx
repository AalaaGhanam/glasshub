'use client';
import { useEffect, useState } from 'react';
import styles from './CertificateView.module.css';
import { useParams } from 'next/navigation';
import { formatDate } from '../utils/common';

export default function CertificateView({
  certificate,
}: {
  certificate?: any;
}) {
  const params = useParams();
  const id = params?.id as string;
  const [certificateData, setCertificateData] = useState(certificate || null);
  const [loading, setLoading] = useState(!certificate);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!certificate && id) {
        try {
          setLoading(true);

          const response = await fetch(`/api/submitCertificate/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setCertificateData(data);
        } catch (err) {
          setError('Failed to load certificate. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, certificate]);

  const formattedDate = certificateData?.issueDate
    ? formatDate(certificateData.issueDate)
    : '';

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!certificateData) {
    return <div>No certificate data found.</div>;
  }
  const logo = `${process.env.NEXT_PUBLIC_API_URL}${certificateData.logo}`;

  return (
    <div className={styles.certificateContainer}>
      <div className={styles.innerBorder}>
        <div className={styles.header}>
          <div>
            {certificateData.logo && (
              <img src={logo} alt="Logo" className={styles.logo} />
            )}
          </div>
          <div className={styles.dateIdSection}>
            <p>Date of issue: {formattedDate}</p>
            <p>Certificate ID#: {certificateData.id}</p>
          </div>
        </div>
        <div
          className={styles.certificateBody}
          dangerouslySetInnerHTML={{ __html: certificateData.content }}
        />
      </div>
      <div className={styles.footer}>
        <p>Powered by GlassHUB</p>
      </div>
    </div>
  );
}
